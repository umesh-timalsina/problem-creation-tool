<script lang="ts">
	import type { NDigitOperation } from '$lib/services/models';
	import { Operator } from '$lib/services/models';
	import { Input, Select, Toggle, type SelectOptionType } from 'flowbite-svelte';
	import Mathjax from '../Mathjax.svelte';

	let {
		problem = $bindable(),
		mode = 'edit'
	}: {
		problem: NDigitOperation;
		mode?: 'edit' | 'preview';
	} = $props();

	let selectItems = Object.values(Operator).map((operator) => {
		return {
			name: operator as string,
			value: operator
		} as SelectOptionType<Operator>;
	});

	function getOperator(operator: Operator) {
		switch (operator) {
			case Operator.PLUS:
				return '+';
			case Operator.MINUS:
				return '-';
			case Operator.MULTIPLY:
				return '\u2A09';
			default:
				return '';
		}
	}

	function getInputBlocks() {
		let result = eval(`${problem.operand1} ${problem.operator} ${problem.operand2}`) as number;

		let blocks = `${result}`.split('').map((digit) => {
			return {
				digit: digit,
				carry: false,
				borrow: false
			};
		});
		return blocks;
	}

	function getCarryBurrowBlocks(operand: string) {
		let blocks = operand
			.trim()
			.split('')
			.map((digit) => {
				return {
					digit: digit
				};
			});
		blocks.push({
			digit: ''
		});

		return blocks;
	}

	function getBlock(operand: string) {
		return operand
			.trim()
			.split('')
			.map((digit) => {
				return {
					digit: digit
				};
			});
	}
</script>

{#if mode === 'preview'}
	<div class="flex w-64 flex-col">
		{#if problem.includeCarryAndBorrow}
			<div class="mb-2 flex flex-1 flex-row justify-end gap-2">
				{#each getCarryBurrowBlocks(problem.operand1) as _}
					<Input type="text" class="w-10 text-xl" />
				{/each}
			</div>
		{/if}
		<div class="mb-2 flex flex-1 flex-row justify-end gap-2">
			{#each getBlock(problem.operand1) as block}
				<Input type="text" class="w-10 text-xl" value={block.digit} disabled />
			{/each}
		</div>
		<div class="mb-2 flex flex-row justify-end gap-2">
			<Input type="text" class="w-10 text-xl" value={getOperator(problem.operator)} disabled />
			{#each getBlock(problem.operand2) as block}
				<Input type="text" class="w-10 text-xl" value={block.digit} disabled />
			{/each}
		</div>
		<hr class="m-2 w-64 self-center-safe" />
		<div class="flex flex-row items-end justify-end gap-2">
			{#each getInputBlocks() as _}
				<Input type="text" class="w-10 text-xl" />
			{/each}
		</div>
	</div>
{:else}
	<div class="mb-2 flex w-full flex-row items-center justify-between gap-2">
		<Input bind:value={problem.operand1} placeholder="Operand 1" />
		<Select
			bind:value={problem.operator}
			items={selectItems}
			placeholder="Operator"
			class="min-w-16"
		/>
		<Input bind:value={problem.operand2} placeholder="Operand 2" />
		<Toggle bind:checked={problem.includeCarryAndBorrow} class="min-w-72"
			>Include carry and burrow blocks</Toggle
		>
	</div>
{/if}
