export async function promised<
    AsyncFn extends (...args: any[]) => Promise<any>,
>(
    asyncFn: AsyncFn,
    ...asyncFnArgs: Parameters<AsyncFn>
): Promise<[Awaited<ReturnType<AsyncFn>>, null] | [null, Error]> {
    try {
        const result = await asyncFn(...asyncFnArgs);
        return [result, null];
    } catch (error: unknown) {
        return [null, error as Error];
    }
}
