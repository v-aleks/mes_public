import { LogosSensor } from "@/app/_utils/sensorClasses";
import { createContext } from "react";

const sensor = new LogosSensor ('Тубонаполнительная машина К-3', '001', 'k3')

export const machineName = createContext(sensor.name)
export const machineURL = createContext(sensor.url)
export const monitorTableAPI = createContext(sensor.getTableEndpoint())
export const monitorChartAPI = createContext(sensor.getChartEndpoint())