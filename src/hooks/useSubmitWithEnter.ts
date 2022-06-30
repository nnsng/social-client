export function useSubmitWithEnter(callback: () => void) {
  return (e: any) => {
    if (e.key === 'Enter') {
      callback();
    }
  };
}
