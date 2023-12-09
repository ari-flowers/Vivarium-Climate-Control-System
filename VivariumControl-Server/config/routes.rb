Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :enclosures do
        resources :temperature_readings
      end
    end
  end

  # Routes for Enclosures
  resources :enclosures do
    # Nested routes for TemperatureReadings under a specific enclosure
    resources :temperature_readings
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
