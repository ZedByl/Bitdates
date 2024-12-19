function getFileExtension(fileName) {
    const match = fileName.match(/\.(\w+)$/);
    return match ? match[1] : null;
}

exports.generateRandomFileName = (name) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let fileName = '';
    const length = 10;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        fileName += characters[randomIndex];
    }

    return fileName + '.' + getFileExtension(name);
}