import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

function convertToSlug(Text) {
  return Text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("h1, h2")
    );

    // Adds a 'slugified' id to all headings on the page.
    headingElements.forEach(heading => {
      heading.setAttribute('id', convertToSlug(heading.innerText));
    })

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H1") {
      nestedHeadings.push({ id, title: 'Introduction', items: [] });
    } else if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] });
    }
  });

  return nestedHeadings;
};

const Headings = styled.div`

  & > div {
    color: var(--textColor);
    font-weight: 600;
    font-size: 0.85em;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  & li {
    list-style: none;
    color: var(--uiLinkColor);
    font-size: 0.85em;
    transition: var(--transition);

    & + li {
      margin-top: 1em;
    }

    &:hover {
      color: var(--uiLinkColorHover);
    }

    &.active {
      color: var(--primaryColor);
    }
  }
`

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef({});
  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -50% 0px"
    });

    const headingElements = Array.from(document.querySelectorAll("h1, h2, h3"));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

const TableOfContents = () => {

  const [activeId, setActiveId] = useState();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);


  return (
    <nav aria-label="Table of contents">
      <Headings>
        <div>Table of Contents</div>
        <ul>
          {nestedHeadings.map((heading) => (
            <li key={heading.id} className={heading.id === activeId ? "active" : ""}>
              <a href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`).scrollIntoView({
                    behavior: "smooth"
                  });
                }}
              >{heading.title}</a>
              {heading.items.length > 0 && (
                <ul>
                  {heading.items.map((child) => (
                    <li key={child.id} className={child.id === activeId ? "active" : ""}>
                      <a href={`#${child.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(`#${child.id}`).scrollIntoView({
                            behavior: "smooth"
                          });
                        }}
                      >{child.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Headings>
    </nav>
  );
};
export default TableOfContents;