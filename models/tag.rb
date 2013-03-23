require 'data_mapper'
require './models/article.rb'

class Tag
	include DataMapper::Resource

	property :id,	Serial
	property :name,	String
	property :created_at,	DateTime
	
	has n, :articles, :through => Resource

end