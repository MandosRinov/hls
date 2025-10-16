

import { useState } from 'react'

export default function useFetching(callback: (...args: any) => any | Promise<any>) {
    let [loading, setLoading] = useState<boolean>(true)
    let [error, setError] = useState<any>('')
    const fetching = async (...args: any[]) => {
        try {
            setLoading(true)
            await callback(...args)
        }
        catch (error) {
            setError(error)
        }
        finally {
            setLoading(false)
        }
    }

    return [fetching, loading, error]
}