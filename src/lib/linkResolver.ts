const linkResolver = (doc: { type: string; uid: string }) => {
  if (doc.type === 'page' && doc.uid !== 'home') {
    return `/${doc.uid}/`;
  }

  if (doc.type === 'person') {
    return `/author/${doc.uid}/`;
  }

  if (doc.type === 'page') {
    return `/${doc.uid}`;
  }

  if (doc.type === 'content-post') {
    return null;
  }

  return '/';
};

export default linkResolver;
