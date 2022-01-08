import React, { useState } from 'react';

const ImageCustom = (imgSrc : string) => {
    const [isLoading, setLoading] = useState<boolean>(true);

    return (
        isLoading ?
        <div>
            Image loading
        </div>
        :
        <div>
            Loading please wait
        </div>
    );
}

export default ImageCustom;
