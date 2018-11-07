<template>
	<li>
		{{ todo.text }}
		<span @click="$emit('remove', todo.id)">&times;</span>
	</li>
</template>

<script>
	export default{
		props : {
			todo : {
				type : Object,
				required : true
			}
		}
	}
</script>

<style>
	li span {
		cursor: pointer;
		font-size: 1.1rem;
	}
</style>

