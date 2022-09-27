import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '9rfmkt5b',
    dataset: 'production',
    apiVersion: '2022-09-23',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKED
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);