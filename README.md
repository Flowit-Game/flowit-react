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

