import { Monitor } from '../../Entities';

export default class MonitorDTO {
	userId?: string; // user reference?
	initialErrorName?: string;
	errorName?: string;
	errorMessage?: string;
	errorType?: string;
	entryTime?: string;
	processTime?: number;
	url?: string;
	method?: string;
	memoryUsage?: number;

	// CPUs = os.cpus();
	// CPU_Usage = process.cpuUsage();

	constructor(monitor?: Monitor) {
		this.userId = monitor?.userId;
		this.initialErrorName = monitor?.initialErrorName;
		this.errorName = monitor?.errorName;
		this.errorMessage = monitor?.errorMessage;
		this.errorType = monitor?.errorType;
		this.entryTime = monitor?.entryTime;
		this.processTime = monitor?.processTime;
		this.url = monitor?.url;
		this.method = monitor?.method;
		this.memoryUsage = monitor?.memoryUsage;
	}
}
