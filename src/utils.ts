export const getCurrentFilename = (filename: string) => {
    return "/src" + filename.split("/src").slice(-1)[0];
}
