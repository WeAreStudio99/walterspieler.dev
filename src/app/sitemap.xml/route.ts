// import { getLocales } from '@/lib/locales';
// import { createClient } from '@/prismicio';

// export const GET = async () => {
//   const baseUrl = process.env.BASE_URL;
//   const client = createClient();

//   const works = await client.getAllByType('workPost');
//   works.forEach(async (work) => {
//     const workLocale = await getLocales(work, client);
//     console.log(workLocale);
//   });

//   // console.log(works);

//   // const worksUrls = works.map((work) => (
//   //    {
//   //     url: `${baseUrl}/works/${work.uid}`,
//   //     lastMod: work.last_publication_date,
//   // 		alternates: work.
//   //   }
//   // ));

//   return new Response(
//     `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\u0020\u0020<url>\n\u0020\u0020\u0020\u0020<loc>${process.env.BASE_URL}</loc>\n\u0020\u0020</url>\n
// 		</urlset>`,
//     {
//       headers: {
//         'Content-Type': 'text/xml',
//       },
//     }
//   );
// };
// //
