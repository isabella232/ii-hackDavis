const arrayBufferToBase64 = buffer => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

export const bufferToImg = buffer => {
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(buffer);
    return base64Flag + imageStr
}
