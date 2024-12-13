const countTimeToReadBlog = (text) => {
    const generalWordPerMinute = 230;

    if (typeof (text) === "string" || text.trim().length !== 0) {
        const textLength = text.trim().split(/\s+/).length;
        const needTimeToRead = Math.ceil((textLength / generalWordPerMinute) * 60);
        return needTimeToRead;
    }

    return 0;
}

module.exports = countTimeToReadBlog;