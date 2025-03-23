<script setup>
    import { updateProductStatus } from '@/lib/api/productsApi';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { defineProps } from 'vue';
import { toast } from 'vue-sonner';

    let props = defineProps({
        item: Object
    })

    const statuses = [
      'Active',
      'Inactive'
    ]

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (status) => updateProductStatus(props.item._id, status),
        onSuccess: () => {
            toast.success('Status updated successfully');
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (error) => {
            toast.error('Error updating status');
            
        }
    })

</script>

<template>

<select
        :value="props.item.status" 
        @change="(e) => mutation.mutate(e.target.value)"
        :disabled="mutation.isLoading"
        class="border border-gray-300 text-gray-700 rounded-md px-2 py-1"
    >

    
        <option 
        v-for="status in statuses"
        :key="status"
        :value="status"
        >
        {{status}}
        </option>
    
    </select>
</template>