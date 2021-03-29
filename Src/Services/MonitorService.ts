/// modules
import { Monitor } from '../Entities';
import { MonitorDTO } from '../DTOs/Monitor';
import { BadRequestError, NotFoundError } from '../Errors/ClientErrors';

export async function getAll(): Promise<MonitorDTO[]> {
	const allMonitors: Monitor[] = await Monitor.find();
	return allMonitors.map((monitor) => new MonitorDTO(monitor));
}

export async function getSingle(id: number): Promise<MonitorDTO> {
	const monitor: Monitor | undefined = await Monitor.findOne(id);

	if (monitor === undefined) {
		throw new NotFoundError(`Could not find monitoring with id: ${id}`);
	}

	return new MonitorDTO(monitor);
}

export async function addSingle(monitorNew: MonitorDTO): Promise<MonitorDTO> {
	const monitor: Monitor = Object.assign(new Monitor(), monitorNew);

	try {
		await monitor.save();
	} catch (error) {
		throw new BadRequestError(error.message, error.name);
	}

	return new MonitorDTO(monitor);
}

export async function updateSingle(id: number, monitorUpdate: MonitorDTO): Promise<MonitorDTO> {
	let monitor: Monitor | undefined = await Monitor.findOne(id);

	if (monitor === undefined) {
		throw new NotFoundError(`Could not find monitoring with id: ${id}`);
	}

	monitor = Object.assign(monitor, monitorUpdate);

	await monitor.save();
	return new MonitorDTO(monitor);
}

export async function deleteSingle(id: number): Promise<void> {
	const monitor: Monitor | undefined = await Monitor.findOne(id);

	if (monitor === undefined) {
		throw new NotFoundError(`Could not find monitoring with id: ${id}`);
	}

	await monitor.remove();
}
