output := harambes-toolkit

${output}:
	mkdir $@
	cp -a -v -x -t $@ src
	cp -a -v -x -t $@ img
	cp -a -v -x -t $@ *.*
	cp -a -v -x -t $@ LICENSE

zip: ${output}
	zip -v -r ${output}.zip ${output}

clean:
	rm -rvf ${output} ${output}.zip
