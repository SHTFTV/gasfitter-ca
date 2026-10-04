import { renderToString } from 'react-dom/server';
import { App, cities, posts } from './main';

export function getRoutes(): string[] {
  return ['/', ...cities.map(([slug]) => `/${slug}/`), ...posts.map(([slug]) => `/${slug}/`)];
}

export function render(url:string): string {
  return renderToString(<App pathName={url} />);
}

export { editorialPosts } from './editorial';
