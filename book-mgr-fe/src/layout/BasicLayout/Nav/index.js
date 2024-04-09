import { ref, defineComponent, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import menu from '@/config/menu';
import store from '@/store';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const openKeys = ref([]);
    const selectedKeys = ref([]);

    onMounted(() => {
      selectedKeys.value = [route.path];

      menu.forEach((item) => {
        (item.children || []).forEach((child) => {
          if (child.url === route.path) {
            openKeys.value.push(item.title);
          }
        });
      });
    });

    const to = (url) => {
      router.push(url);
    };

    const filterMenu = computed(() => {
      const filterCondition = store.state.userCharacter.name === 'admin' ? [0, 2] : [1, 2];
      return menu.map(item => {
        if (item.children) {
          return {
            ...item,
            children: item.children.filter(child => filterCondition.includes(child.onlyAdmin))
          };
        } else {
          return item;
        }
      }).filter(item => filterCondition.includes(item.onlyAdmin) || (item.children && item.children.length > 0));
    });

    return {
      openKeys,
      selectedKeys,
      menu: filterMenu,
      to,
      store: store.state
    };
  }
});