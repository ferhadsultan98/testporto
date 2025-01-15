import React, { useEffect, useState } from 'react';
import './Projects.css';
import projectsData from './projects.json';
import { IoLogoGithub } from "react-icons/io";

const Projects = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(projectsData);
    const cardElements = document.querySelectorAll(".card");
    let delay = 0;

    cardElements.forEach(el => {
      el.style.animation = "swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both";
      el.style.animationDelay = delay + "s";
      delay += 0.2;
    });
  }, []);

  return (
    <div className="ProjeContainer">
      <h1>Projects</h1>
      <hr className="project-separator" />
      <div className="card-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-main">
              <img src={card.imgSrc} alt={`${card.title} Logo`} />
            </div>
            <div className="card-hover">
              {/* GitHub Icon Link using githubLink from JSON */}
              <a href={card.githubLink} target="_blank" rel="noopener noreferrer">
                <IoLogoGithub size={40} color="white" />
              </a>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="tags">
                {card.tags.map((tag, tagIndex) => (
                  <div className="tag" key={tagIndex}>{tag}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
