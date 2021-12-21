# react-web-worker

This is a proof-of-concept on how to use [Web-Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) within an React App and TypeScript

## Run it locally

1. Clone this repository
2. Install dependencies

```
npm i
```

3. Run dev server

```
npm run dev
```

Go to port [localhost:1234](http://localhost:1234)

## Cases

### Synchronous call

Good all synchronous JavaScript. It will block the main thread while doing an stupidly expensive computation.

### Asynchronous call (Promise)

Will do the same stupidly expensive computation, but this time using `async/await`. So it will run asynchronously (but still concurrently)

### Vanilla Web Worker

Will run the computation on a separate thread, in paralell the worker-thread is able to perform expensive tasks in a completely unblocked way.

## Comlink Web Worker

[Comlink](https://github.com/GoogleChromeLabs/comlink) is a library that allows you to work on the worker-thread without feeling you left the main thread.
I consider it equivalent to how `async/await` did for Promises.
