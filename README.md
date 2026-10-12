# Flowit-react
A clone of [Flowit](https://github.com/Flowit-Game/Flowit) using typescript / react / nextjs that can be played at [https://flowit-game.github.io/flowit-react/](https://flowit-game.github.io/flowit-react/)

# Licensing
Is licenced as AGPL-3.0.

## Getting Started
To build flowit-react locally, first, install the node modules:
```bash
yarn
```

Next fetch the [levels repository](https://github.com/Flowit-Game/Levels), which is a submodule in `levels-source` (or clone with `--recurse-submodules`)
```bash
git submodule update --init
```

Now you can run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building a release
Ensure the `levels-source` submodule is checked out (`git submodule update --init`). Then run
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

## Updating the levels
The levels are pinned to a commit of the submodule. To pull in new levels, run
```bash
git submodule update --remote levels-source
```
and commit the updated `levels-source`.
