import axios from 'axios';

const { GOOGLE_API_KEY } = process.env;
const getMapUrl = async (location) => {
  let url;
  const locationCheck = location.split(' ');
  if (locationCheck.length <= 2 && !Number(locationCheck[0]) && !Number(locationCheck[1])) {
    const writtenLocation = encodeURI(location);
    url = `https://maps.googleapis.com/maps/api/geocode/json?address=${writtenLocation}&key=${GOOGLE_API_KEY}`;
    try {
      const result = await axios.get(url);
      const { lat, lng } = result.data.results[0].geometry.location;
      url = `https://www.google.com/maps/embed/v1/search?q=${lat}+${lng}&key=${GOOGLE_API_KEY}`;
      return url;
    } catch (error) {
      if (error.status) return { status: error.status };
      return { error };
    }
  }
  url = `https://www.google.com/maps/embed/v1/search?q=${locationCheck[0]}+${locationCheck[1]}&key=${GOOGLE_API_KEY}`;
  return url;
};

export default getMapUrl;
