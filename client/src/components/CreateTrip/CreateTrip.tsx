import { FC, useEffect, useState } from 'react';
import { TripData } from '../../models/TripData';
import { createTrip } from '../../services/tripService';
import { Route } from '../../models/Route';
import { getRoutes } from '../../services/routeService';
import TripForm from '../TripForm/TripForm.tsx';
import { useSnackbar } from '../SnackBarContext/SnackBarContext.tsx';
import { getRoutesFromLocalStorage, saveRoutesToLocalStorage } from '../../utils/localStorageUtils.ts';
import { stripSpaces } from '../../utils/utils.ts';

const initialTripData: TripData = {
  startKilometers: '',
  endKilometers: '',
  date: new Date(),
  startTime: null,
  endTime: new Date(),
  route: '',
  deliveries: null
};

const CreateTrip: FC = () => {
  const {setSuccess, setError} = useSnackbar();
  const [tripData, setTripData] = useState<TripData | null>(() => {
    const today = new Date();
    const savedData = localStorage.getItem('tripFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        ...parsedData,
        date: today,
        startTime: parsedData.startTime ? new Date(parsedData.startTime) : null,
        endTime: new Date(),
        route: parsedData.route
      };
    }
    return initialTripData;
  });

  const [routes, setRoutes] = useState<Route[] | undefined>([]);

  useEffect(() => {
    (async () => {
      try {
        let routes = getRoutesFromLocalStorage();
        if (!routes) {
          routes = await getRoutes();
          saveRoutesToLocalStorage(routes);
        }
        setRoutes(routes);

        // Set default route
        if (routes && routes.length > 0) {
          setTripData((prevTripData) => {
            if (!prevTripData) return null;
            return {
              ...prevTripData,
              route: prevTripData.route || routes[0].description
            };
          });
        }

      } catch (error) {
        alert(`Jotain meni pieleen: ${error}`);
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('tripFormData', JSON.stringify(tripData));
  }, [tripData]);

  const onSave = async (): Promise<void> => {
    try {
      if (!tripData) return;

      const sanitizedTripData = {
        ...tripData,
        startKilometers: stripSpaces(tripData.startKilometers.toString()),
        endKilometers: stripSpaces(tripData.endKilometers.toString()),
      };


      await createTrip(sanitizedTripData);
      const newTripData: TripData = {
        startKilometers: sanitizedTripData.endKilometers,
        startTime: null,
        endTime: null,
        endKilometers: '',
        date: new Date(),
        route: '',
        deliveries: null
      };

      setTripData(newTripData);
      setSuccess("Tallennus onnistui");
    } catch (err) {
      setError(`Tallennus epäonnistui, ${err}`);
    }
  };

  return (
    <TripForm
      tripData={tripData}
      setTripData={setTripData}
      routes={routes}
      onSave={onSave}
      setError={setError}
    />
  );
};

export default CreateTrip;
