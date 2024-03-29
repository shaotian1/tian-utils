import {Scheduler, chunk} from '../../dist/umd'

const createPromise = (fn, delay) => {
    return () => new Promise(resolve => {
        setTimeout(() => {
            fn();
            resolve();
        }, delay)
    })
}

const scheduler = new Scheduler(2);

scheduler.addTask(createPromise(
    () => console.log('500延迟的任务'),
    500
))

scheduler.addTask(createPromise(
    () => console.log('3000延迟的任务'),
    3000
))

scheduler.addTask(createPromise(
    () => console.log('500延迟的任务'),
    500
))

scheduler.addTask(createPromise(
    () => console.log('2000延迟的任务'),
    2000
))

scheduler.addTask(createPromise(
    () => console.log('4500延迟的任务'),
    4500
))

scheduler.start();