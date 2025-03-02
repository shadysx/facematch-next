
export const formatBytesToMb = (bytes: number) => {
    return Number((bytes / (1024 * 1024)));
}

export const formatBytesToMbStr = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
}