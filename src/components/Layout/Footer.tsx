import React from 'react';
import './Footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import { LinkedIn } from '@mui/icons-material';

export const Footer = () => {
  return (
    <footer className="footer-app">
      <p>
        &copy; 2023 dans100
        <span>
          <a href="https://github.com/dans100" target="_blank" rel="noreferrer">
            <GitHubIcon />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/daniel-su%C5%82kowski-35b0ab257/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIn />
          </a>
        </span>
      </p>
    </footer>
  );
};
