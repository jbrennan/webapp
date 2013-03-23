require 'data_mapper'
require './models/article.rb'

class Draft
	include DataMapper::Resource

	property :id,	Serial
	property :headline,	String
	property :body_md, 	Text
	property :unique_id, String # a uuid

	property :created_at,	DateTime
	property :updated_at, 	DateTime
	
	belongs_to :article
end