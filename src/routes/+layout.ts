import type { LayoutLoad } from './$types';
export const ssr = false;
export const prerender = false;

export const load: LayoutLoad = async () => {
	const { getEnvironment } = await import('$lib/services/knowLearningStore.svelte');
	const env = await getEnvironment();
	return {
		env
	};
};
