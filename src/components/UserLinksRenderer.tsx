'use client';

import { useState, useEffect } from 'react';
import Handlebars from 'handlebars';

interface UserLink {
  id: string;
  title: string;
  url: string;
}

interface UserLinksRendererProps {
  links: UserLink[];
  cssTemplate: string;
  htmlTemplate: string;
}

export function UserLinksRenderer({ 
  links, 
  cssTemplate, 
  htmlTemplate 
}: UserLinksRendererProps) {
  const [renderedHtml, setRenderedHtml] = useState('');

  useEffect(() => {
    // Compile Handlebars template
    const template = Handlebars.compile(htmlTemplate);
    const html = template({ links });
    setRenderedHtml(html);
  }, [links, htmlTemplate]);

  return (
    <div>
      <style jsx global>{`
        ${cssTemplate}
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
    </div>
  );
}
