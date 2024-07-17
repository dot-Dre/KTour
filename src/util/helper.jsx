const mapBoardPositionTo3D = ([row, col]) => {
    const size = 2; 
    const boardOrigin = { x: -7, z: -7 }; 
    const x = col * size + boardOrigin.x;
    const z = row * size + boardOrigin.z;
    const y = 1; 
    return [x, y, z];
};

export default mapBoardPositionTo3D;