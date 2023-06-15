export const fomatDate = (dateString) =>{
    const dateObj = new Date(dateString);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();
    const hours = ("0" + dateObj.getHours()).slice(-2);
    const minutes = ("0" + dateObj.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
}

export const enCoder = (value)=>{
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(value);
    return utf8Bytes;
}

export const deCoder = (value)=>{
    // Giải mã chuỗi UTF-8
    const decoder = new TextDecoder("utf-8");
    const text = decoder.decode(value);
    return text;
}

export const formatArrayBufferDeCode = (obj) =>{
    const uint8Arr = new Uint8Array(Object.values(obj));
    const buffer = uint8Arr.buffer;
    const decoder = new TextDecoder("utf-8");
    const text = decoder.decode(buffer);
    return text;
}