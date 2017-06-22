import { AST } from 'parse5';

export function getHeadElement(document: AST.Default.Document) {
  const htmlElement = document.childNodes
    .map(node => node as AST.Default.Element)
    .find(element => element.tagName === 'html');

  return htmlElement.childNodes
    .map(node => node as AST.Default.Element)
    .find(element => element.nodeName === 'head');
}

export function getTitle(headElement: AST.Default.Element) {
  const titleElement = headElement.childNodes
    .map(node => node as AST.Default.Element)
    .find(element => element.tagName === 'title');

  const titleElementTextNode = titleElement ? titleElement.childNodes[0] as AST.Default.TextNode : undefined;
  return titleElementTextNode ? titleElementTextNode.value : undefined;
}

export function getMetaValuesMap(headElement: AST.Default.Element) {
  return headElement.childNodes
    .map(node => node as AST.Default.Element)
    .filter(element => element.tagName === 'meta')
    .map(element => ({
        nameAttr: element.attrs.find(attr => attr.name === 'name' || attr.name === 'property'),
        contentAttr: element.attrs.find(attr => attr.name === 'content')
    }))
    .filter(elementInfo => elementInfo.nameAttr !== undefined && elementInfo.contentAttr !== undefined)
    .map(elementInfo => ({
      name: elementInfo.nameAttr.value,
      content: elementInfo.contentAttr.value
    }))
    .reduce<{ [name: string]: string }>((map, meta) => (map[meta.name] = meta.content, map), {});
}
