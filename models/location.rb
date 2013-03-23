require 'data_mapper'
require "./models/article.rb"

class Location
	include DataMapper::Resource

	property :id,	Serial
	property :name,	String
	property :lat,	Float
	property :lon,	Float
	property :created_at,	DateTime
	
	has n, :articles, :through => Resource
end