const Lines = ({
  mapState: { width, height },
  latLngToPixel,
  coordsArray,
  style = { stroke: "rgb(255,0,0)", strokeWidth: 2 },
}) => {
  if (coordsArray.length < 2) {
    return null;
  }
  let lines = [];
  let pixel = latLngToPixel(coordsArray[0]);
  for (let i = 1; i < coordsArray.length; i++) {
    try {
      let pixel2 = latLngToPixel(coordsArray[i]);
      lines.push(
        <line
          key={i}
          x1={pixel[0]}
          y1={pixel[1]}
          x2={pixel2[0]}
          y2={pixel2[1]}
          style={style}
        />
      );
      pixel = pixel2;
    } catch (error) {}
  }

  return (
    <svg width={width} height={height} style={{ top: 0, left: 0 }}>
      {lines}
    </svg>
  );
};

export default Lines;
