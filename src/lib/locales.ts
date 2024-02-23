import { Client, Content } from '@prismicio/client';

export async function getLocales(
  doc: Content.AllDocumentTypes,
  client: Client<Content.AllDocumentTypes>
) {
  const [repository, altDocs] = await Promise.all([
    client.getRepository(),
    doc.alternate_languages.length > 0
      ? client.getAllByIDs(
          doc.alternate_languages.map((altLang) => altLang.id),
          {
            lang: '*',
            fetch: `${doc.type}.__nonexistent-field__`,
          }
        )
      : Promise.resolve([]),
  ]);

  return [doc, ...altDocs].map((page) => {
    const lang = repository?.languages.find((l) => l.id === page.lang);

    return {
      lang: lang?.id || '',
      url: page?.url || '',
      lang_name: lang?.name || '',
    };
  });
}
