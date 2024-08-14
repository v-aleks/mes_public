import { makeAutoObservable } from 'mobx';
import { Logos1SensorReport } from "@/app/_utils/sensorClasses";


export class WorkplaceStore {
  constructor(props) {
    const workplace001 = new Logos1SensorReport('Рабочее место 001', '001');
    const workplace002 = new Logos1SensorReport('Рабочее место 002', '002');

    this.workplace001Name = workplace001.name
    this.workplace002Name = workplace002.name
    this.mainEndpoint = workplace001.getApiEndpoint();
    makeAutoObservable(this);
  }
}
