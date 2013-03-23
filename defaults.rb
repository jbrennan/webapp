class Defaults
  
  @@storage = nil
  private_class_method :new
  
  private
  def Defaults.storage
    if @@storage == nil
      if File.exist?("user_defaults")
        File.open("user_defaults", "rb") { |file| 
          @@storage = Marshal.load(file)
        }
      end
      
      if @@storage == nil
        # either it didn't exist or couldn't be read
        @@storage = {}
      end
    end
    @@storage
  end
  
  public
  def Defaults.[](key)
    Defaults.storage[key]
  end
  
  def Defaults.[]=(key, value)
    Defaults.storage[key] = value
    Defaults.synchronize
  end
  
  def Defaults.synchronize
    # write the storage back out to disk
    File.open("user_defaults", "wb") do |file|
      Marshal.dump(@@storage, file)
    end
  end 
end