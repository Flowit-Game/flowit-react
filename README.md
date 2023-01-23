# Flowit-react
A clone of [Flowit](https://github.com/Flowit-Game/Flowit) using typescript / react / nextjs.

# Licensing
Is licenced as AGPL-3.0.

## Getting Started
First, install the node modules:
```bash
yarn
```

Next clone the levels repository
```bash
git clone https://github.com/Flowit-Game/Levels.git
```

Then convert the levels to the expected format
```bash
yarn convert-levels
```

Now you can run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building a release
Ensure you have downloaded and converted the levels. Then run 
```bash
yarn next build
yarn next export
```

This will create an `out` directory with static files that can be hosted (e.g. On GitHub pages or Amazon S3) to create the site.

If you have docker available and want a quick preview of the site, you can run
```bash
cd out
docker run --rm -p 3001:80 -v $PWD:/usr/share/nginx/html nginx
```
And then browse to [http://localhost:3001](http://localhost:3001)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
