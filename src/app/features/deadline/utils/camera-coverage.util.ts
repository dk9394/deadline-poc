interface CameraRange {
  min: number;
  max: number;
}

interface HardwareCamera {
  lightRange: CameraRange;
  distanceRange: CameraRange;
}

const cameras: HardwareCamera[] = [
  {
    lightRange: { min: 300, max: 500 },
    distanceRange: { min: 1000, max: 2000 },
  },
];

export function versatileSoftwareCamera(
  lightRange: number,
  subjectDistance: number,
  hardwareCameras: HardwareCamera[]
): HardwareCamera[] {
  return hardwareCameras.filter((camera) => {
    const underLightRange =
      camera.lightRange.min <= lightRange &&
      camera.lightRange.max >= lightRange;
    const underDistanceRange =
      camera.distanceRange.min <= subjectDistance &&
      camera.distanceRange.max >= subjectDistance;
    return underLightRange && underDistanceRange;
  });
}
