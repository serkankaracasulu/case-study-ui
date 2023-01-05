import { useState, useEffect, useRef } from "react"

export function usePromise<T>(promiseFunc: () => Promise<T>, initial: T, deps: Array<unknown>) {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T>(initial);
    const [error, setError] = useState<any>(null);
    const promiseRef = useRef<Promise<T>>();
    useEffect(() => {
        if (!promiseFunc || loading) {
            return;
        }
        promiseRef.current = promiseFunc();
        setLoading(true);
        promiseRef.current.then((result) => {
            console.log(result)
            setData(result);
        }).catch((err) => {
            setError(err)
        }).finally(() => { setLoading(false) });

        return () => {

        };
    }, deps)

    return { loading, data, error }
}