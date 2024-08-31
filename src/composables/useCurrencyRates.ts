import { onMounted, ref } from "vue";
import axios from "axios";

const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);
const rates = ref<{ [key: string]: number }>({});

const fetchRates = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get("https://status.neuralgeneration.com/api/currency");
    rates.value = response.data;
  } catch (err) {
    console.error("Error fetching currency rates:", err);
    error.value = "Failed to load currency rates";
  } finally {
    isLoading.value = false;
  }
};

export function useCurrencyRates() {
  onMounted(fetchRates);

  return { rates, isLoading, error };
}
