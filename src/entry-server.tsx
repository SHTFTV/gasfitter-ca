import { renderToString } from 'react-dom/server';
import { App, cities, posts } from './main';
import { equipmentCategories } from './equipment-bands';
export function getRoutes():string[]{const core=['/blog/','/','/app/','/contact/','/gas-lines-vancouver/','/locations/','/management-system/','/services/','/testimonials/','/whychooseus/'];return [...core,...equipmentCategories.map(x=>'/'+x.id+'/'),...cities.map(([s])=>'/'+s+'/'),...posts.map(([s])=>'/'+s+'/')];}
export function render(url:string):string{return renderToString(<App pathName={url}/>);}
export { editorialPosts } from './editorial';
export { planningPoints } from './planning-visual';
