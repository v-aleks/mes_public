import { makeAutoObservable } from 'mobx';
import { LogosSensor } from "@/app/_utils/sensorClasses";
import { Logos1SensorReport, Logos1Sensor } from '@/app/_utils/sensorClasses';

export class MachinesStore {
  constructor(props) {
    //Инициализация датчиков
    const workplaceBase = new Logos1SensorReport('1', '1') // Базовые методы
    const sensor = new LogosSensor('Тубонаполнительная машина К-3', '001', 'k3'); 
    const workplace001 = new Logos1Sensor('Рабочее место 001', '001');
    const workplace002 = new Logos1Sensor('Рабочее место 002', '002');
    // Тубонаполнительная к-3
    this.machineName = sensor.name;
    this.machineURL = sensor.url;
    this.monitorTableAPI = sensor.getTableEndpoint();
    this.monitorChartAPI = sensor.getChartEndpoint();
    //Рабочие места
    this.workplaceBaseEndpont = workplaceBase.getApiEndpoint();
    this.workplace001 = workplace001;
    this.workplace002 = workplace002;
    makeAutoObservable(this);
  }
}
