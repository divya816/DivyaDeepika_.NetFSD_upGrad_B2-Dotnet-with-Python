window.DashboardService = (() => {
  const getSummary = async () => StorageService.getDashboard();
  return { getSummary };
})();
