class StaticController < ApplicationController
  def welcome
    @stats = Donation.total_stats
  end

  def about
    
  end

  def root
  end
end
