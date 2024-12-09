import { getPlaiceholder } from "plaiceholder";

import { BASE_URL } from "../../next.constants.mjs";

/**
 * Fetches an image from a URL and generates a low-resolution placeholder using plaiceholder
 * @param src - The source URL path of the image (will be prefixed with BASE_URL)
 * @returns Object containing the plaiceholder data and original image source
 * @throws Will return a fallback object with base64 placeholder if fetch/processing fails
 */
const getImage = async (src: string) => {
  try {
    const buffer = await fetch(`${BASE_URL}/${src}`).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );

    const plaiceholder = await getPlaiceholder(buffer, { size: 10 });

    return { ...plaiceholder, img: { src } };
  } catch (err) {
    console.error(`Error getting ${src}`, err);
    return {
      img: { src },
      // Base 64 of main OG image
      base64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAADDUExURRYZHBYaHRgdHxkgIhkfIR0nKCIwMB8qKxgeIBccHxohIxwkJRsiJBwlJiMxMCtAPiY3NhwmJxwnJxkhIyAuLixDQCo/PRoiIzI8PD1JSDY/QDtBQjU5OzE4OkBOTTZIRh4oKThFRFljY1FYWU5SVFBSVE9SVFZbXT5KSiAsLSEvLiMtLx8lKB4iJh0hJRYaHBskJRUYGx4qKh8nKSEmKRwfIxccHhUZHBUbHUNGSEVIShMWGSIlKDAyNRQXGhgdIP///76MK3EAAAABYktHRED+2VzYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AwGDSo4melmdwAAAG1JREFUCNdjYGBkYmZhYWVj52Bg5OTi5uHl4xfgYmDiEhQSFhYRFeNlEJeQlJKWkZWTV2DgVVRSVlFVU9fQZOAQ0dLW0dXTN9BkMOQyMjbRMzU042YwNOewsLSyNjQ0YzAEAhtbOxjTDijIYA8A9HIMrsqV2PAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMTItMDZUMTM6NDI6NDMrMDA6MDAzNJvBAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTEyLTA2VDEzOjQyOjQzKzAwOjAwQmkjfQAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNC0xMi0wNlQxMzo0Mjo1NiswMDowMIvuLZsAAAAASUVORK5CYII=",
    };
  }
};

export { getImage };
