import type { ClientInit } from '@sveltejs/kit';

export const init: ClientInit = async () => {
	const { initialize } = await import('$lib/services/knowLearningStore.svelte');
	await initialize();
};
